'use client'
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Delete } from "./delete";
import { useRouter } from "next/navigation";
import { ComputerColumns } from "./columns";

export const DeleteModal = ({content}: {content: ComputerColumns}) => {


    const [isOpen, setIsOpen] = useState(false);
      const router = useRouter();

      const handleDeleteSuccess = () => {
        router.push('/dashboard')
      };
      
      const handleUpdateClick = () => {
        router.push(`/edit/${content.id}`);
        router.refresh(); 
      };

      return (
        <div>
          <Delete
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            id={content.id} 
            onDeleteSuccess={handleDeleteSuccess}
          />
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(content.id)}>
                  Copy payment ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsOpen(true)} style={{ cursor: "pointer" }}>
                  Delete
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleUpdateClick} style={{ cursor: "pointer" }}>
                  Update
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      );
}