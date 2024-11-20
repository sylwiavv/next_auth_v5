import UserAvatar from "@/components/auth/UserAvatar/UserAvatar";
import { UserButton } from "@/components/auth/UserButton";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { NavbarLinks } from "./NavbarLinks";

export const Navbar = () => {
  // const currentUser = useCurrentUser();

  return (
    <div className="flex justify-between items-center flex-wrap p-4 gap-y-4 gap-x-4 text-gray-900">
      <nav className="flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm bg-slate-200 h-full">
        <NavbarLinks />
        <UserButton />
      </nav>
      {/* {currentUser?.image && <UserAvatar imageSrc={currentUser?.image} />} */}
    </div>
  );
};
