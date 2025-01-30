from fastapi import FastAPI
import pickle
import pandas as pd
from fpdf import FPDF

app = FastAPI()

# Load Models
supplier_model = pickle.load(open("models/supplier_model.pkl", "rb"))
inventory_model = pickle.load(open("models/inventory_model.pkl", "rb"))
shipment_model = pickle.load(open("models/shipment_model.pkl", "rb"))

@app.get("/")
def read_root():
    return {"message": "Welcome to the AI-Powered Supply Chain Dashboard Backend"}

# Supplier Reliability Prediction
@app.post("/predict/supplier/")
def predict_supplier(lead_time: float, cost: float, past_orders: int):
    input_data = [[lead_time, cost, past_orders]]
    prediction = supplier_model.predict(input_data)
    return {"predicted_reliability": int(prediction[0])}

# Inventory Demand Forecast
@app.post("/predict/inventory/")
def predict_inventory():
    prediction = inventory_model.forecast(steps=7)  # Next 7 days
    return {"inventory_forecast": prediction.tolist()}

# Shipment Delay Prediction
@app.post("/predict/shipment/")
def predict_shipment(delay_time: float):
    prediction = shipment_model.predict([[delay_time]])
    return {"predicted_delay": bool(prediction[0])}

# Generate PDF Report
@app.get("/generate-report/")
class SupplyChainReport(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 14)
        self.cell(0, 10, 'Supply Chain Optimization Dashboard Report', ln=True, align='C')
        self.ln(10)

    def footer(self):
        self.set_y(-15)
        self.set_font('Arial', 'I', 8)
        self.cell(0, 10, f'Page {self.page_no()}', align='C')

    def add_section(self, title):
        self.set_font('Arial', 'B', 12)
        self.cell(0, 10, title, ln=True, align='L')
        self.ln(5)

    def add_metric(self, label, value, trend=None):
        self.set_font('Arial', '', 12)
        self.cell(0, 10, f'{label}: {value} {trend if trend else ""}', ln=True, align='L')

    def add_table(self, table_data, column_widths, headers):
        self.set_font('Arial', 'B', 12)
        for header, width in zip(headers, column_widths):
            self.cell(width, 10, header, border=1, align='C')
        self.ln()
        self.set_font('Arial', '', 12)
        for row in table_data:
            for value, width in zip(row, column_widths):
                self.cell(width, 10, str(value), border=1, align='C')
            self.ln()

def generate_report():
    pdf = SupplyChainReport()
    pdf.add_page()

    # Add Introduction Section
    pdf.add_section('Overview')
    pdf.set_font('Arial', '', 12)
    pdf.multi_cell(0, 10, (
        "This report summarizes key performance metrics, predictive insights, "
        "and supply chain optimization data for the observed period. "
        "It combines AI-powered forecasts with real-time data to assist decision-makers in improving efficiency."
    ))
    pdf.ln(10)

    # Add Key Metrics
    pdf.add_section('Key Metrics')
    pdf.add_metric('Order Fulfillment Rate', '91.3%', trend='(+5.9%)')
    pdf.add_metric('Inventory Turnover', '5.21', trend='(-6.7%)')
    pdf.add_metric('Supplier Reliability', '91.2%', trend='(+3.2%)')
    pdf.add_metric('Cost Efficiency', '87.1%', trend='(-6.7%)')
    pdf.ln(10)

    # Add Supplier Performance
    pdf.add_section('Supplier Performance')
    table_data = [
        ['TechComponents Inc', 'San Francisco, CA', '95.0%', '5 days', '$120'],
        ['Global Parts Ltd', 'Shanghai, China', '88.0%', '8 days', '$95'],
        ['EuroSupply GmbH', 'Munich, Germany', '92.0%', '7 days', '$110'],
        ['Pacific Logistics', 'Singapore', '89.0%', '6 days', '$105'],
    ]
    pdf.add_table(table_data, [50, 50, 30, 30, 30], ['Supplier', 'Location', 'Reliability', 'Lead Time', 'Cost/Unit'])
    pdf.ln(10)

    # Add Shipment Tracking
    pdf.add_section('Shipment Tracking')
    shipment_data = [
        ['San Francisco, CA -> Austin, TX', 'In-transit', '2024-03-25'],
        ['Shanghai, China -> Los Angeles, CA', 'Delayed', '2024-03-22 (Delayed by 2 days)'],
        ['Munich, Germany -> Paris, France', 'Delivered', '2024-03-20'],
    ]
    pdf.add_table(shipment_data, [90, 50, 50], ['Route', 'Status', 'ETA'])
    pdf.ln(10)

    # Add Predictive Insights
    pdf.add_section('Predictive Insights')
    pdf.add_metric('Predicted Inventory Demand (Next 7 Days)', '450, 460, 475, 480, 490, 500, 520')
    pdf.add_metric('Potential Shipment Delays', 'Shanghai -> Los Angeles (High risk of delay)')
    pdf.add_metric('Supplier Risk Alert', 'Global Parts Ltd (88.0% reliability) flagged for review.')
    pdf.ln(10)

    # Save the Report
    pdf.output('SupplyChainReport.pdf')
    print("Report generated: 'SupplyChainReport.pdf'")

if __name__ == "__main__":
    generate_report()
