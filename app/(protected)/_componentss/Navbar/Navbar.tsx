import UserAvatar from "@/components/auth/UserAvatar/UserAvatar";
import { UserButton } from "@/components/auth/UserButton";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export const Navbar = () => {
  const currentUser = useCurrentUser();
  const pathname = usePathname();

  return (
    <div className="flex justify-between items-center flex-wrap p-4 gap-y-4 gap-x-4 text-gray-900">
      <nav className="flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm bg-slate-200 h-full">
        <div className="flex gap-x-2">
      
          <Button
            asChild
            variant={pathname === "/server" ? "default" : "outline"}
          >
            <Link href="/server">Server component</Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/admin" ? "default" : "outline"}
          >
            <Link href="/client">Admin</Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/settings" ? "default" : "outline"}
          >
            <Link href="/settings">Settings</Link>
          </Button>
        </div>
        
        <UserButton />
      </nav>
      {currentUser?.image && <UserAvatar imageSrc={currentUser?.image} />}
    </div>
  );
};
