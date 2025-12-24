import { API_URL } from "@/constants/config";
import axios from "axios";

interface UploadResponse{
    success: boolean;
    data: {
        url: string;
        key: string;
        size: number;
        contentType: string;
    };
}

export default function getImageUploadService({token}: {token: string}) {
    const client = axios.create({
        baseURL: API_URL,
        headers: {  
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    function handleServiceError(error: unknown): never {
        console.error("Image Upload Service Error:", error);
        throw new Error("Error en el servicio de subida de imágenes.");
    }

    async function uploadImage(ImageData: FormData): Promise<string> {
        try {
            const response = await client.post<UploadResponse>("/images", ImageData, {
                headers: {
                    "Content-Type": "multipart/form-data",
            },
        });
        return response.data.data.url;
        } catch (error) {
            handleServiceError(error);
        }
    }
        
    return{
        uploadImage
    }
};
