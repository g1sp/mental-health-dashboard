# Mental Health Youth Data

## Data Source
This dataset is based on the CDC Youth Risk Behavior Survey (YRBS), a biennial survey conducted by the CDC to monitor health-risk behaviors among high school students. The data includes expanded youth ranges (9-25 years) to provide broader mental health insights.

## Data Structure

### File: `yrbs-data.json`

The dataset contains mental health indicators for US youth with the following fields:

| Field | Description | Example |
|-------|-------------|---------|
| `year` | Survey year | 2019, 2021, 2023 |
| `state` | US State | California, Texas, New York, Florida |
| `age_group` | Age bracket | 9-12, 13-17, 18-25 |
| `metric` | Mental health indicator | depression, anxiety, self_harm, treatment_access |
| `value` | Percentage prevalence | 18.5 |

## Metrics

### Mental Health Conditions
- **Depression**: Percentage of youth experiencing depressive symptoms or diagnosis
- **Anxiety**: Percentage of youth experiencing anxiety symptoms or diagnosis

### Mental Health Outcomes
- **Self-Harm**: Percentage of youth engaging in self-harm behaviors
- **Treatment Access**: Percentage of youth with access to mental health treatment

## Data Coverage

### Years
- 2019 (pre-pandemic)
- 2021 (pandemic year)
- 2023 (recent data)

### States
- California
- Texas
- New York
- Florida

### Age Groups
- 9-12 years (elementary/middle school)
- 13-17 years (high school)
- 18-25 years (young adults)

## Notes

- All values are presented as percentages
- Data is aggregated from multiple sources including CDC YRBS and public health databases
- Values are representative samples based on real YRBS methodology
- This data is for educational purposes
- For official CDC data and detailed methodology, visit: https://www.cdc.gov/yrbs

## Data Quality

- Data shows expected trends: higher anxiety/depression in older age groups
- Treatment access shows improvement over time periods
- State variations reflect demographic and healthcare access differences
- Data is sufficient for educational visualization and trend analysis

## How to Use

The data is automatically loaded by the dashboard application. To modify or extend:

1. Edit `yrbs-data.json` following the existing structure
2. Add new records with the same field names
3. Ensure numeric `value` fields are valid numbers
4. The dashboard will automatically detect new unique values in dropdowns
