import { useState } from 'react'
import { Save, X, Upload, Plus } from 'lucide-react'

export default function ProductEditor({ product, onSave, onCancel }) {
  const [formData, setFormData] = useState(product || {
    name: '',
    price: '',
    stock: '',
    categoryId: '',
    description: '',
  })
  const [images, setImages] = useState(product?.images || [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImages((prev) => [...prev, reader.result])
      }
      reader.readAsDataURL(file)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({ ...formData, images })
  }

  return (
    <div className='product-editor'>
      <div className='product-editor__header'>
        <h2>{product ? 'تعديل المنتج' : 'إضافة منتج جديد'}</h2>
        <button onClick={onCancel} className='icon-btn'>
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className='product-editor__form'>
        <div className='form-group'>
          <label>اسم المنتج</label>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label>السعر</label>
          <input
            type='number'
            name='price'
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label>المخزون</label>
          <input
            type='number'
            name='stock'
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label>القسم</label>
          <input
            type='text'
            name='categoryId'
            value={formData.categoryId}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label>الوصف</label>
          <textarea
            name='description'
            value={formData.description}
            onChange={handleChange}
            rows={4}
          />
        </div>

        <div className='form-group'>
          <label>الصور</label>
          <div className='image-upload'>
            <label className='upload-btn'>
              <Upload size={20} />
              <span>رفع صور</span>
              <input
                type='file'
                multiple
                accept='image/*'
                onChange={handleImageUpload}
              />
            </label>
            <div className='image-preview'>
              {images.map((image, index) => (
                <div key={index} className='image-preview-item'>
                  <img src={image} alt={`صورة ${index + 1}`} />
                  <button
                    type='button'
                    onClick={() => setImages(images.filter((_, i) => i !== index))}
                    className='icon-btn'
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='form-actions'>
          <button type='button' onClick={onCancel} className='btn btn--ghost'>
            إلغاء
          </button>
          <button type='submit' className='btn btn--primary'>
            <Save size={16} />
            حفظ
          </button>
        </div>
      </form>
    </div>
  )
}
