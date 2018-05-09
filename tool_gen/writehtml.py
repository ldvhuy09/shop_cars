f = open('data.txt')
g = open('out.html', 'w')

for i in range(0, 40):
  g.write('<tr>\n')
  for j in range(0, 9):
    line = f.readline()
    if j == 8: break
    if j == 3:
      g.write('\t<td>1</td>\n')
      continue
    if j != 1:
      i = line.find(':') + 1
      g.write('\t<td>' + line[i:len(line) - 1] + '</td>\n')
      
  g.write('</tr>\n')

f.close()
g.close()
