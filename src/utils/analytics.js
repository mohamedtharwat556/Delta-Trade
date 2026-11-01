import { availabilityOf } from './pricing.js'

export function catalogHealth(products) {
  const outOfStock = products.filter((p) => availabilityOf(p).key === 'out')
  const lowStock = products.filter((p) => availabilityOf(p).key === 'low')
  const noWholesale = products.filter((p) => !p.wholesalePrice || !p.wholesaleMinQuantity)
  
  return {
    outOfStock,
    lowStock,
    noWholesale,
  }
}

export function customerGroups(orders) {
  const customers = {}
  orders.forEach((order) => {
    if (order.customerId) {
      customers[order.customerId] = (customers[order.customerId] || 0) + 1
    }
  })
  return Object.values(customers)
}

export function topSellers(products, limit = 8) {
  return products
    .filter((p) => p.price && p.stock > 0)
    .sort(() => Math.random() - 0.5)
    .slice(0, limit)
}

export function ordersSummary(orders) {
  const total = orders.reduce((sum, order) => sum + order.total, 0)
  const pending = orders.filter((o) => o.currentStatus === 'created').length
  const completed = orders.filter((o) => o.currentStatus === 'delivered').length
  
  return {
    total,
    pending,
    completed,
    count: orders.length,
  }
}

export function priceRows(products) {
  return products.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    wholesalePrice: p.wholesalePrice,
    wholesaleMinQuantity: p.wholesaleMinQuantity,
  }))
}

export function ordersForCustomer(orders, customerId) {
  return orders.filter((o) => o.customerId === customerId)
}

export function calculateSalesStats(orders) {
  const totalSales = orders.reduce((sum, order) => sum + order.total, 0)
  const averageOrderValue = orders.length > 0 ? totalSales / orders.length : 0
  const totalOrders = orders.length

  return {
    totalSales,
    averageOrderValue,
    totalOrders,
  }
}

export function calculateTopProducts(orders, products) {
  const productSales = {}
  
  orders.forEach((order) => {
    order.items.forEach((item) => {
      productSales[item.productId] = (productSales[item.productId] || 0) + item.quantity
    })
  })

  return Object.entries(productSales)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([productId, quantity]) => ({
      productId,
      quantity,
      product: products.find((p) => p.id === productId),
    }))
}

export function calculateCustomerSegments(orders) {
  const segments = {
    new: 0,
    returning: 0,
    vip: 0,
  }

  orders.forEach((order) => {
    const customerOrders = orders.filter((o) => o.customerId === order.customerId)
    if (customerOrders.length === 1) segments.new++
    else if (customerOrders.length < 5) segments.returning++
    else segments.vip++
  })

  return segments
}
