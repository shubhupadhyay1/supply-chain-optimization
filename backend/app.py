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
def generate_report():
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    pdf.cell(200, 10, txt="Supply Chain Dashboard Report", ln=True, align='C')
    pdf.cell(200, 10, txt="Key Metrics", ln=True, align='L')
    pdf.cell(200, 10, txt="Order Fulfillment Rate: 91.3%", ln=True, align='L')
    pdf.cell(200, 10, txt="Inventory Turnover: 5.21", ln=True, align='L')
    pdf.cell(200, 10, txt="Supplier Reliability: 91.2%", ln=True, align='L')
    pdf.cell(200, 10, txt="Cost Efficiency: 87.1%", ln=True, align='L')
    pdf.output("report.pdf")
    return {"message": "Report generated successfully", "file": "report.pdf"}
