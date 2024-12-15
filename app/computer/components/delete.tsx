import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useRouter } from "next/router";
import { revalidatePath } from "next/cache";


export const Delete = ({
    isOpen,
    onClose,
    id,
    onDeleteSuccess,
}: {
    isOpen: boolean;
    onClose: () => void;
    id: string;
    onDeleteSuccess: () => void;
}) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/computer", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }), 
            });
            const data = await response.json();
    
            onDeleteSuccess();
            onClose();

        } catch (error) {
            console.error("Error during delete", error);
        } finally {
            setLoading(false);
        }
        revalidatePath("/computer")
    };

    const onModalChanges = (open: boolean) => {
        if (open) {
            onClose();
        }
    };  

    return (
        <AlertDialog onOpenChange={onModalChanges} open={isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Memencet tombol continue akan menghapus data pada tabel secara permanen.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={async () => { 
                        await handleDelete();
                    }}>
                        {loading ? "Deleting..." : "Continue"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
