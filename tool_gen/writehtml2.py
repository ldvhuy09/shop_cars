dict = {
  'Audi': '',
  'BMW': '',
  'Ford': '',
  'Honda': '',
  'Lexus': '',
  'Mercedes-Benz': '',
  'Toyota': ''
}

f = open('data.txt')
g = open('out2.html', 'w')

for i in range(0, 40):
  cate = ''
  output = '<tr>\n'
  for j in range(0, 9):
    line = f.readline()
    if j == 8: break
    if j == 3:
      output += '\t<td>1</td>\n'
      continue
    if j != 1:
      i = line.find(':') + 2
      if j != 7:
        output += '\t<td>' + line[i:len(line) - 1] + '</td>\n'

      if j == 7:
        cate = line[i:len(line) -1]      
  output += '</tr>\n'
  dict[cate] += output

for a in dict:
  g.write(a + '\n')
  g.write(dict[a])
f.close()
g.close()
