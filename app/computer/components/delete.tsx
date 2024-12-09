import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";  // Import useRouter
import { useState } from "react";

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
    const router = useRouter(); // Inisialisasi useRouter

    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/computer", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }), // Kirim id untuk dihapus
            });
            const data = await response.json();
    
            if (data.status === 200) {
                onDeleteSuccess();
                onClose();
                router.refresh(); // Refresh halaman setelah berhasil delete
            } else {
                console.error("Failed to delete data");
            }
        } catch (error) {
            console.error("Error during delete", error);
        } finally {
            setLoading(false);
        }
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
