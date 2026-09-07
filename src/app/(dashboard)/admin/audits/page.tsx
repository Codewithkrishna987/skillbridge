import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Lock, User, Clock, AlertTriangle } from "lucide-react";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminAuditsPage() {
  const auditLogs = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E4DFD1] pb-5">
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-[#1B4332]" />
          System Audit Trail & Governance Compliance
        </h1>
        <p className="text-sm text-zinc-600 mt-1">
          Immutable audit record of institutional verification events, match score overrides, and administrative actions.
        </p>
      </div>

      <Card className="border-[#E4DFD1] bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-zinc-200 bg-zinc-50/80 text-[11px] uppercase tracking-wider text-zinc-500 font-semibold">
              <tr>
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Entity</th>
                <th className="px-4 py-3">IP / Context</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {auditLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-zinc-500">
                    System initialized. No audit alerts registered in current window.
                  </td>
                </tr>
              ) : (
                auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-4 py-3 text-zinc-500 whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 font-semibold text-zinc-900">
                      {log.action}
                    </td>
                    <td className="px-4 py-3 text-zinc-700">
                      {log.entityType}: {log.entityId}
                    </td>
                    <td className="px-4 py-3 text-zinc-500">
                      {log.ipAddress || "Internal System"}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="verified">LOGGED</Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
