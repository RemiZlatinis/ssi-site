interface TableProps {
  children: React.ReactNode;
}

export function Table({ children }: TableProps) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
      <table className="w-full text-sm text-left">
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <thead className="bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 sticky top-0">
      {children}
    </thead>
  );
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return (
    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
      {children}
    </tbody>
  );
}

export function TableRow({ children }: { children: React.ReactNode }) {
  return (
    <tr className="odd:bg-white even:bg-zinc-50/50 dark:odd:bg-zinc-950 dark:even:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors">
      {children}
    </tr>
  );
}

export function TableHead({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">
      {children}
    </th>
  );
}

export function TableCell({ children }: { children: React.ReactNode }) {
  return (
    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
      {children}
    </td>
  );
}
