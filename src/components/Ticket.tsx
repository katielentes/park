import React from 'react';

type TicketProps = {
  ticket: {
    ticketId: number;
    serviceType: string;
    checkInTime: string;
    checkOutTime: string | null;
    totalCost: number;
    paid: boolean;
    assignedSpot: string;
    logs: LogEntry[];
    car: {
      carId: number;
      plate: string;
      carColor: string;
      carMake: string;
      carModel: string;
    };
    customer: {
      customerId: number;
      customerName: string;
      phone: string;
    };
  };
};

type LogEntry = {
  enter?: string;
  exit?: string;
};

const Ticket: React.FC<TicketProps> = ({ ticket }) => {
  return (
    <div className="border border-gray-300 rounded p-4 mb-2">
      <h3>Ticket ID: {ticket.ticketId}</h3>
      <p>Service Type: {ticket.serviceType}</p>
      <p>Check-in Time: {ticket.checkInTime}</p>
      <p>Check-out Time: {ticket.checkOutTime || 'Not checked out yet'}</p>
      <p>Total Cost: {ticket.totalCost}</p>
      <p>Paid: {ticket.paid ? 'Yes' : 'No'}</p>
      <p>Assigned Spot: {ticket.assignedSpot}</p>
      <h4>Logs:</h4>
      <ul>
        {ticket.logs.map((log, index) => (
          <li key={index}>
            {log.exit ? `Exit: ${log.exit}` : `Enter: ${log.enter}`}
          </li>
        ))}
      </ul>
      {ticket.car && (
        <>
          <h4>Car:</h4>
          <p>Car ID: {ticket.car.carId}</p>
          <p>Plate: {ticket.car.plate}</p>
          <p>Car Color: {ticket.car.carColor}</p>
          <p>Car Make: {ticket.car.carMake}</p>
          <p>Car Model: {ticket.car.carModel}</p>{' '}
          <p>Assigned Spot: {ticket.assignedSpot}</p>
          <h4>Customer:</h4>
          <p>Customer ID: {ticket.customer.customerId}</p>
          <p>Customer Name: {ticket.customer.customerName}</p>
          <p>Phone: {ticket.customer.phone}</p>
        </>
      )}
    </div>
  );
};

export default Ticket;
