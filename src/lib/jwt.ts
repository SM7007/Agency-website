const JWT_SECRET = process.env.JWT_SECRET || "devcraft-studio-super-secret-key-change-me-in-production";

function base64urlEncode(str: string): string {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function base64urlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) base64 += "=";
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  const decoder = new TextDecoder();
  return decoder.decode(bytes);
}

function bufferToBase64url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function base64urlToBuffer(str: string): ArrayBuffer {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) base64 += "=";
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

async function getCryptoKey() {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(JWT_SECRET);
  return await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function signToken(payload: any): Promise<string> {
  const header = { alg: "HS256", typ: "JWT" };
  const headerStr = JSON.stringify(header);
  const payloadStr = JSON.stringify(payload);
  
  const headerEncoded = base64urlEncode(headerStr);
  const payloadEncoded = base64urlEncode(payloadStr);
  
  const tokenInput = `${headerEncoded}.${payloadEncoded}`;
  
  const encoder = new TextEncoder();
  const data = encoder.encode(tokenInput);
  const key = await getCryptoKey();
  
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, data);
  const signatureEncoded = bufferToBase64url(signatureBuffer);
  
  return `${headerEncoded}.${payloadEncoded}.${signatureEncoded}`;
}

export async function verifyToken(token: string): Promise<any | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    
    const [headerEncoded, payloadEncoded, signatureEncoded] = parts;
    
    const encoder = new TextEncoder();
    const tokenInput = `${headerEncoded}.${payloadEncoded}`;
    const tokenInputData = encoder.encode(tokenInput);
    
    const signatureBuffer = base64urlToBuffer(signatureEncoded);
    const key = await getCryptoKey();
    
    const isValid = await crypto.subtle.verify("HMAC", key, signatureBuffer, tokenInputData);
    if (!isValid) return null;
    
    const payloadStr = base64urlDecode(payloadEncoded);
    const payload = JSON.parse(payloadStr);
    
    if (payload.exp && Date.now() > payload.exp) {
      return null;
    }
    
    return payload;
  } catch (err) {
    return null;
  }
}
