dict = {
  'name' : '',
  'image' : '',
  'price' : '',
  'views' : '',
  'decription' : '',
  'originally' : '',
  'categories' : '',
  'brand' : ''
}

f = open('./data.txt')
g = open ('./update_db.sql', 'w')

for i in range(40):
  emptyline = f.readline()
  for key in dict:
    line = f.readline();
    dict[key] = line[(len(key) + 2):len(line) - 1]

  prop ="NULL" + ', ' + "\"" + dict['name'] + "\"" + ', ' + "\"" + dict['categories'] + "\"" + ', ' + "\"" + dict['brand'] + "\"" + ', ' + "\"" + dict['originally'] + "\"" + ', ' + dict['views'] + ', ' + dict['price'] + ', ' + dict['image'] 
  g.write("INSERT INTO _PRODUCT VALUES(" + prop + ");\n")
f.close()
g.close()
