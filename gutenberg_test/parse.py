import re

index = open('GUTINDEX.ALL', 'r')

current_text_part = ""
current_number = 0

titles = {}

def getTitle(title):
    # We are getting a string that is split by , and might end in a by AUTHOR.
    title_parts = re.split(r'(,|\[)', title)
    full_title = ""
    for title_part in title_parts:
        if title_part.lstrip().startswith("by"):
            return (full_title, title_part)
        elif title_part.rstrip().endswith("]"):
            return (full_title, None)
        elif title_part == ',' or title_part == '[':
            return (full_title, None)
        else:
            full_title += re.sub(',', '', title_part)
    return (full_title, None)

line_parts = []
for line in index.readlines():
    if line.strip() == "":
        continue
    line_parts = re.split(r'\s{2,}', line.strip())
    # If we have a long enough line for two parts and ends in a number, 
    # then this is a new line, add the old text part to the index.
    if len(line_parts) > 1 and str.isnumeric(line_parts[1]) and current_number != 0:
        title = getTitle(current_text_part)
        print(title[0])
        titles[title[0]] = current_number 
    # We are not at end of line, add to current text part
    if len(line_parts) == 1 and not current_text_part.startswith('['):
        current_text_part += line_parts[0].lstrip()
    elif str.isnumeric(line_parts[1]):
        current_number = int(line_parts[1])
        current_text_part = line_parts[0]

title = getTitle(current_text_part)
print('Title: %s' % title[0])
titles[title] = current_number 
