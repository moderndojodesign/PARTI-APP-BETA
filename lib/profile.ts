"use client";

import { useEffect, useState, useCallback } from "react";
import type { IssueTag } from "@/lib/types";

export type CivicScope =
  | "Neighborhood"
  | "Municipality"
  | "County"
  | "State"
  | "National"
  | "Global";

export type PartiProfile = {
  interests: IssueTag[];
  zip: string;
  scope: CivicScope;
  profession?: string;
  createdAt: string;
};

const KEY = "parti.profile.v1";

function read(): PartiProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PartiProfile;
    if (!parsed || !Array.isArray(parsed.interests)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function write(p: PartiProfile | null) {
  if (typeof window === "undefined") return;
  if (p === null) window.localStorage.removeItem(KEY);
  else window.localStorage.setItem(KEY, JSON.stringify(p));
  window.dispatchEvent(new CustomEvent("parti:profile-change"));
}

export function saveProfile(p: Omit<PartiProfile, "createdAt"> & { createdAt?: string }) {
  const full: PartiProfile = {
    ...p,
    createdAt: p.createdAt ?? new Date().toISOString(),
  };
  write(full);
  return full;
}

export function clearProfile() {
  write(null);
}

export function useProfile() {
  const [profile, setProfile] = useState<PartiProfile | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProfile(read());
    setHydrated(true);

    const onChange = () => setProfile(read());
    window.addEventListener("parti:profile-change", onChange);
    window.addEventListener("storage", (e) => {
      if (e.key === KEY) onChange();
    });
    return () => {
      window.removeEventListener("parti:profile-change", onChange);
    };
  }, []);

  const update = useCallback((p: Omit<PartiProfile, "createdAt">) => {
    const next = saveProfile(p);
    setProfile(next);
  }, []);

  const remove = useCallback(() => {
    clearProfile();
    setProfile(null);
  }, []);

  return { profile, hydrated, update, remove };
}
