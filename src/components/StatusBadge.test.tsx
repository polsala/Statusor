import { render, screen } from "@testing-library/react";
import StatusBadge from "./StatusBadge";

describe("StatusBadge", () => {
  it("renders label for operational", () => {
    render(<StatusBadge status="operational" />);
    expect(screen.getByText(/Operational/)).toBeInTheDocument();
  });

  it("renders label for outage", () => {
    render(<StatusBadge status="major_outage" />);
    expect(screen.getByText(/Major outage/)).toBeInTheDocument();
  });
});
