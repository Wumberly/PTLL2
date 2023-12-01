from bs4 import BeautifulSoup
import requests
import re
from tabulate import tabulate

def extract_content(text, start_marker, end_marker):
    pattern = re.compile(f'{start_marker}(.*?){end_marker}', re.DOTALL)
    match = re.search(pattern, text)
    return match.group(1).strip() if match else ''

def extract_conjugations(input_string):
    pronoun_pairs = [('eu', 'tu'), ('tu', 'ele'), ('você', 'nós'), ('nós', 'vós'), ('vós', 'eles'), ('vocês', '&&')]
    conjugations = []

    for pronoun1, pronoun2 in pronoun_pairs:
        # Define the pattern to capture text between pronoun1 and pronoun2
        pattern = f'{pronoun1}(.*?){pronoun2}'

        # Match the content between pronoun1 and pronoun2
        match = re.search(pattern, input_string + "&&")

        # Add the matched content to the list
        conjugations.append(match.group(1).strip() if match else '')

    return conjugations


url = "https://www.verbos-portugueses.info/en/conjugation/2278-abafar.html"

result = requests.get(url)
doc = BeautifulSoup(result.text, "html.parser")
#print(doc.prettify())
conj = doc.get_text()


pattern = extract_content(conj,'Indicative mood', 'Subjunctive') + "&&"
pattern2 = extract_content(conj + "&&",'Subjunctive mood', '&&') + "&&"


# Table content
order_mapping = {
    "Indicative": ["Present", "Imperfect", "Preterite", "Pluperfect", "Future", "Conditional"],
}

table_headers = ["Mood", "Tense", "Content"]



# Table construction
table_data = [[mood, tense, ""] for mood, tenses in order_mapping.items() for tense in tenses]

table_data[0][2] = extract_content(pattern, "Present", "Imperfect")+"&&"
table_data[1][2] = extract_content(pattern, "Imperfect", "Preterite")+"&&"
table_data[2][2] = extract_content(pattern, "Preterite", "Pluperfect")+"&&"
table_data[3][2] = extract_content(pattern, "Pluperfect", "Future")+"&&"
table_data[4][2] = extract_content(pattern, "Future", "Conditional")+"&&"
table_data[5][2] = extract_content(pattern, "Conditional", "&&")+"&&"


# Add a new column for conjugations
for row in table_data:
    content = row[2]
    conjugations = extract_conjugations(content)
    row.append(conjugations)

# Display the table
table = tabulate(table_data, headers=table_headers + ["Conjugations"], tablefmt="grid")

print(table)

new_table = [["Mood", "Tense", "Conjugation"]]

for row in table_data:  # Include the first row
    first_column = row[0]  # Get the first column
    second_column = row[1]
    last_column_elements = row[-1]  # Get the last column elements

    for element in last_column_elements:
        new_row = [first_column, second_column, str(element)]
        new_table.append(new_row)

for row in new_table:
    print(row)


