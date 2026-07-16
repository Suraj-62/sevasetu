import { create } from 'zustand';

const useStore = create((set) => ({
  // Bookings State
  bookings: [
    {
      id: 'BKG-101',
      service: 'AC Service & Repair',
      customerName: 'Suraj',
      date: 'Tomorrow, 10:00 AM',
      status: 'Pending',
      price: 499,
      address: '123 Main St, New Delhi'
    },
    {
      id: 'BKG-102',
      service: 'Plumbing - Leak Fix',
      customerName: 'Rahul',
      date: 'Today, 2:00 PM',
      status: 'Accepted',
      price: 299,
      address: '45 Park Ave, New Delhi'
    }
  ],
  addBooking: (booking) => set((state) => ({ bookings: [...state.bookings, booking] })),
  updateBookingStatus: (id, status) => set((state) => ({
    bookings: state.bookings.map(b => b.id === id ? { ...b, status } : b)
  })),

  // Orders State
  orders: [
    {
      id: 'ORD-501',
      product: 'LG Washing Machine',
      customerName: 'Suraj',
      date: 'Expected Delivery: Tomorrow',
      status: 'Processing',
      price: 25000
    }
  ],
  addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),
  updateOrderStatus: (id, status) => set((state) => ({
    orders: state.orders.map(o => o.id === id ? { ...o, status } : o)
  })),

  // Products State (Vendor specific)
  products: [
    {
      id: 'PROD-1',
      name: 'LG 1.5 Ton AC',
      category: 'Air Conditioners',
      price: 45990,
      stock: 12
    },
    {
      id: 'PROD-2',
      name: 'Kent Supreme RO',
      category: 'RO Purifiers',
      price: 14500,
      stock: 5
    }
  ],
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  deleteProduct: (id) => set((state) => ({ products: state.products.filter(p => p.id !== id) }))
}));

export default useStore;
