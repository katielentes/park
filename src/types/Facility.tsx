type Facility = {
  facilityId: number;
  facilityName: string;
  tickets: Ticket[];
};

type Ticket = {
  ticketId: number;
  serviceType: string;
  checkInTime: string;
  checkOutTime: string | null;
  totalCost: number;
  paid: boolean;
  assignedSpot: string;
  logs: { exit: string }[] | { enter: string }[];
  customer: Customer;
  car: Car;
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
