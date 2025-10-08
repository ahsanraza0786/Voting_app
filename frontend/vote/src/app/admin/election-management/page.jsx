// Deprecated file (moved to /election-management). Keeping as a minimal redirect to avoid 404s.
"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DeprecatedElectionManagement() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/election-management');
  }, [router]);
  return null;
}
