const {
    constants: {
    DOCS_MIMETYPES,
    PHOTOS_MIMETYPES,
    VIDEOS_MIMETYPES,
    FILE_MAX_SIZE,
    PHOTO_MAX_SIZE,
    VIDEO_MAX_SIZE
    }
} = require('../constants')

module.exports = {
    checkFiles: (req, res, next) => {
        try {
            const files = Object.values(req.files);
            
            const documents = []; 
            const videos = []; 
            const photos = []; 

            for (let i = 0; i < files.length; i++) {
                const { name, size, mimetype } = files[i];
           
                if (PHOTOS_MIMETYPES.includes(mimetype)){
                    if( size > PHOTO_MAX_SIZE ){
                        throw new Error(`File ${name} is too big`)
                    }

                    photos.push(file[i]);
                } else if (VIDEOS_MIMETYPES.includes(mimetype)){
                    if( size > VIDEO_MAX_SIZE ){
                        throw new Error(`File ${name} is too big`)
                    }

                    videos.push(file[i]);
                } else if (DOCS_MIMETYPES.includes(mimetype)){
                    if( size > FILE_MAX_SIZE ){
                        throw new Error(`File ${name} is too big`)
                    }

                    documents.push(file[i]);
                } else {
                    throw new Error('Wrong file format')
                }
            }

            req.documents = documents;
            req.videos = videos;
            req.photos = photos;

            next()
        }catch(e){
            next(e);
        }
    }
}