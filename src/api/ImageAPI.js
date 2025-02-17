import UnauthorApi from "./baseAPI/UnauthorBaseApi";

class ImageAPI {
  constructor() {
    this.url = "/api/images";
  }

  // Lấy tất cả hình ảnh
  getAllImages = async () => {
    return UnauthorApi.get(`${this.url}/get-all-images`);
  }

  
  uploadImage = async (formData) => {
    return UnauthorApi.post(`${this.url}/storage-image`, formData);
  };

}

export default new ImageAPI();
