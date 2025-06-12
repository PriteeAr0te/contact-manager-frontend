import axios from "axios";
import API from "../lib/api";

export const uploadImageToCloudinary = async (file) => {
    const sigRes = await API.get("/upload/signature");
    const { timestamp, signature, apiKey, cloudName, folder } = sigRes.data;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append("folder", folder);
    formData.append("cloudName", cloudName)

    const cloudinaryRes = await axios.post(
        `https://api.cloudinary.com/v1_1/dmhocuxlk/image/upload`,
        formData
    );

    return {
        url: cloudinaryRes.data.secure_url,
        public_id: cloudinaryRes.data.public_id,
    };
};
