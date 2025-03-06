import pandas as pd
import json

file_path = 'Book1.xlsx'
xls = pd.ExcelFile(file_path, engine='openpyxl')

sheet1_data = pd.read_excel(xls, sheet_name=0)
sheet2_data = pd.read_excel(xls, sheet_name=1)

# Replace NaN with empty strings in both sheets
sheet1_data = sheet1_data.fillna("")
sheet2_data = sheet2_data.fillna("")

date_columns = ['Manufacturing Date', 'Expiration Date', 'Analysis Date']
for col in date_columns:
    if col in sheet1_data.columns:
        sheet1_data[col] = pd.to_datetime(sheet1_data[col], errors='coerce').dt.strftime('%d-%b-%Y')

sheet1_dict = sheet1_data.to_dict(orient='records')[0]

tests = []
current_test = None
test_specifications = {}

for index, row in sheet2_data.iterrows():
    test_name = row['Test']
    specification = row['Specification']
    
    if test_name:
        if current_test:
            tests.append(current_test)
        current_test = {
            "testName": test_name,
            "specification": "",
            "subtests": []
        }
        test_specifications[test_name] = set()
    
    if test_name:
        test_specifications[test_name].add(specification)
    
    subtest = {
        "testId": str(row['Test ID']),
        "methodName": row['Method'],
        "resultState": row['Result'],
        "specification": specification
    }
    current_test["subtests"].append(subtest)

if current_test:
    tests.append(current_test)

# Adjust specifications based on the number of unique specifications per test
for test in tests:
    test_name = test["testName"]
    if len(test_specifications[test_name]) == 1 and test["subtests"][0]["specification"]:
        unique_specification = list(test_specifications[test_name])[0]
        test["specification"] = unique_specification
        for subtest in test["subtests"]:
            subtest["specification"] = unique_specification
    else:
        test["specification"] = ""
        for subtest in test["subtests"]:
            subtest["specification"] = subtest["specification"]

combined_json = {
    "lot_id": sheet1_dict.get('Lot ID', ''),
    "product_grade": sheet1_dict.get('Product Grade', ''),
    "product_code": sheet1_dict.get('Product Code', ''),
    "manufacturing_date": sheet1_dict.get('Manufacturing Date', ''),
    "expiration_date": sheet1_dict.get('Expiration Date', ''),
    "analysis_date": sheet1_dict.get('Analysis Date', ''),
    "tests": tests
}

formatted_json = json.dumps(combined_json, indent=4)
print(formatted_json)