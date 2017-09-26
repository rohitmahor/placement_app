import subprocess
import re

output = subprocess.check_output(["less","027_CSE_4_SEM.pdf"])

re_data_prefix = re.compile("^[0-9]+[.].*$")
re_data_fields = re.compile("(([^ ]+[ ]?)+)")
for line in output.splitlines():
    if re_data_prefix.match(line):
        print [l[0].strip() for l in re_data_fields.findall(line)]