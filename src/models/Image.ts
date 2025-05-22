import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    data: {
        type: Buffer,
        required: true
    },
    contentType: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Awards', 'Events', 'Training']
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    }
}, { timestamps: true });

const Image = mongoose.models.Image || mongoose.model('Image', imageSchema);

export default Image;
