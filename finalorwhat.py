import pandas as pd
import json

def excel_to_json(file_path):
    xls = pd.ExcelFile(file_path)
    df_sheet1 = xls.parse("Sheet1") 
    df_sheet2 = xls.parse("Sheet2") 

    metadata = {col: str(df_sheet1[col].iloc[0]).encode('utf-8').decode('utf-8') if not df_sheet1[col].isna().iloc[0] else "" for col in df_sheet1.columns}

    tests = []
    current_test = None
    
    for _, row in df_sheet2.iterrows():
        test_name = str(row["Test"]).strip() if pd.notna(row["Test"]) else ""
        specification = str(row["Specification"]).strip() if pd.notna(row["Specification"]) else ""
        method = str(row["Method"]).strip() if pd.notna(row["Method"]) else ""
        result = str(row["Result"]).strip() if pd.notna(row["Result"]) else ""
        
        if not any([test_name, specification, method, result]):
            if current_test:
                tests.append(current_test)
            current_test = None  
            continue
        
        if test_name and not current_test:
            current_test = {
                "test": test_name,
                "specification": specification,
                "method": method,
                "result": result,
                "subtests": []
            }
        
        elif current_test:
            current_test["subtests"].append({
                "id": test_name,
                "specification": specification,
                "method": method,
                "result": result
            })
    
    if current_test:
        tests.append(current_test)
    result_json = {**metadata, "tests": tests}
    
    return json.dumps(result_json, indent=4, ensure_ascii=False)
file_path = "Transformed.xlsx"
json_output = excel_to_json(file_path)
print(json_output)
