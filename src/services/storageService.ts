export type UploadPayload = {
  name: string;
  type: 'image' | 'video' | 'document';
};

export const uploadToS3 = async (file: UploadPayload) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    url: `https://fake-s3.amazonaws.com/demo/${file.name}`,
    key: `demo/${file.name}`,
  };
};
