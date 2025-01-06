import { WritableAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

class AtomStorageService {
  private atoms: Record<string, WritableAtom<any, any, void>>;

  constructor() {
    this.atoms = Object.keys(localStorage).reduce((acc, key) => {
      acc[key] = atomWithStorage<any>(
        key,
        this.safeParse(localStorage.getItem(key))
      );
      return acc;
    }, {} as Record<string, WritableAtom<any, any, void>>);
  }

  private safeParse(value: string | null): any {
    try {
      return value ? JSON.parse(value) : null;
    } catch (e) {
      console.warn(`Failed to parse value from localStorage: ${value}`, e);
      return null;
    }
  }

  getAtom<T>(key: string, initialValue: T): WritableAtom<T, any, void> {
    if (!this.atoms[key]) {
      this.atoms[key] = atomWithStorage<T>(key, initialValue);
    }
    return this.atoms[key] as WritableAtom<T, any, void>;
  }

  removeAtom(key: string): void {
    if (this.atoms[key]) {
      localStorage.removeItem(key);
      delete this.atoms[key];
    }
  }
}

export default AtomStorageService;
