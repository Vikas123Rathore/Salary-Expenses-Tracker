# Cash-Flow Sprint Notes

- Vanilla JavaScript only.
- Persist salary, expenses, and currency state in localStorage.
- Calculate remaining balance from `salary - total expenses` on every render.
- Keep the Chart.js pie chart in sync by destroying the previous instance before re-rendering.
- Use jsPDF for the report export.
- Track the currency display separately from the stored base values.

QA checklist:

1. Enter salary, add expenses, and verify the totals update immediately.
2. Refresh the page and confirm the values load back from localStorage.
3. Delete an expense and confirm the balance and chart update instantly.
4. Switch currency and confirm the display converts.
5. Download the PDF report and confirm the summary and item list are included.