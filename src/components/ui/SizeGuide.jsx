import { Ruler } from 'lucide-react'

export default function SizeGuide() {
  return (
    <div className='size-guide'>
      <h3><Ruler /> دليل المقاسات</h3>
      <table className='size-guide__table'>
        <thead>
          <tr>
            <th>المقاس</th>
            <th>الطول (سم)</th>
            <th>العرض (سم)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>S</td>
            <td>68</td>
            <td>48</td>
          </tr>
          <tr>
            <td>M</td>
            <td>72</td>
            <td>52</td>
          </tr>
          <tr>
            <td>L</td>
            <td>76</td>
            <td>56</td>
          </tr>
          <tr>
            <td>XL</td>
            <td>80</td>
            <td>60</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
