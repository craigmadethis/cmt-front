import { buildImageUrl, buildUrl } from 'cloudinary-build-url'
const blurLoader = (hash) => {
  return buildImageUrl(hash, {
    cloud: {
      cloudName: 'dwrkp09mb',
    },
    transformations: {
      resize: {
        type: 'scale',
        width: 500,
        height: 500,
      },
      effect: {
        name: 'blur:1000',
        quality: 25
      }
    }
  })
}
export default blurLoader;
