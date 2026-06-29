import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

// Re-export JWT utilities from the Edge-compatible jwt.ts module
export { signToken, verifyToken } from "./jwt";

// --- Password Hashing Utilities ---
// These run in the standard Node.js server environment (API routes)

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hashed = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hashed}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  try {
    const [salt, hashed] = stored.split(":");
    if (!salt || !hashed) return false;
    const hashToCompare = scryptSync(password, salt, 64).toString("hex");
    return timingSafeEqual(Buffer.from(hashed, "hex"), Buffer.from(hashToCompare, "hex"));
  } catch (error) {
    return false;
  }
}
