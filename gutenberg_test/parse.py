import re

index = open('GUTINDEX.ALL', 'r')

current_text_part = ""
current_number = 0

titles = {}

def getTitle(title):
    # We are getting a string that is split by , and might end in a by AUTHOR.
    title_parts = title.split(',')
    full_title = ""
    for title_part in title_parts:
        if title_part.lstrip().startswith("by"):
            return full_title
        elif title_part.lstrip().startswith("["):
            return full_title
        else:
            full_title += re.sub(',', '', title_part)
    return full_title

for line in index.readline():
    if not line.strip():
        continue
    line_parts = re.split(r'\s{2,}', line)
    # If we have a long enough line for two parts and ends in a number, 
    # then this is a new line, add the old text part to the index.
    if len(line_parts) > 1 and str.isnumeric(line_parts[1]) and current_number != 0:
        title = getTitle(line_parts[0])
        print(title)
        titles[title] = current_number
    else:
        # We are not at end of line, add to current text part
        if len(line_parts) == 1:
            current_text_part += line_parts[0]
        elif str.isnumeric(line_parts[1]):
            current_number = int(line_parts[1])
            current_text_part = line_parts[0]

print(titles)
