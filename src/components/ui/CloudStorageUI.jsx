import { Cloud, Upload } from 'lucide-react'

export default function CloudStorageUI() {
  return (
    <div className='cloud-storage-ui'>
      <h3><Cloud /> التخزين السحابي</h3>
      <div className='cloud-storage-ui__upload'>
        <label className='upload-zone'>
          <Upload size={32} />
          <span>اسحب الصور هنا أو انقر للرفع</span>
          <input type='file' multiple accept='image/*' />
        </label>
      </div>
      <div className='cloud-storage-ui__info'>
        <p>المساحة المستخدمة: 45 MB / 1 GB</p>
        <div className='progress-bar'>
          <div className='progress-bar__fill' style={{ width: '4.5%' }}></div>
        </div>
      </div>
    </div>
  )
}
