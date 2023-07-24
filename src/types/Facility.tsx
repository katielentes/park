type Facility = {
  facilityId: number;
  facilityName: string;
};

type Ticket = {
  ticketId: number;
  serviceType: string;
  checkInTime: string;
  checkOutTime: string | null;
  totalCost: number;
  paid: boolean;
  assignedSpot: string;
  logs: LogEntry[];
  customer: Customer;
  car: Car;
};

type LogEntry = {
  type: 'enter' | 'exit';
  time: string;
};

type Customer = {
  customerId: number;
  customerName: string;
  phone: string;
};

type Car = {
  carId: number;
  plate: string;
  carColor: string;
  carMake: string;
  carModel: string;
};
