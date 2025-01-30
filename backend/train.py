import pandas as pd
import pickle
from sklearn.ensemble import RandomForestClassifier
from statsmodels.tsa.arima.model import ARIMA
from sklearn.linear_model import LogisticRegression

# Supplier Reliability Model
def train_supplier_model():
    df = pd.read_csv("supplier_data.csv")
    X = df[['lead_time', 'cost', 'past_orders']]
    y = df['reliability']
    model = RandomForestClassifier()
    model.fit(X, y)
    pickle.dump(model, open("models/supplier_model.pkl", "wb"))

# Inventory Demand Forecasting
def train_inventory_model():
    df = pd.read_csv("inventory_data.csv")
    model = ARIMA(df['stock_level'], order=(5, 1, 0))
    model_fit = model.fit()
    pickle.dump(model_fit, open("models/inventory_model.pkl", "wb"))

# Shipment Delay Prediction
def train_shipment_model():
    df = pd.read_csv("shipment_data.csv")
    df['delayed'] = df['status'].apply(lambda x: 1 if x == 'delayed' else 0)
    X = df[['delay_time']]
    y = df['delayed']
    model = LogisticRegression()
    model.fit(X, y)
    pickle.dump(model, open("models/shipment_model.pkl", "wb"))

if __name__ == "__main__":
    train_supplier_model()
    train_inventory_model()
    train_shipment_model()
    print("All models trained and saved!")
