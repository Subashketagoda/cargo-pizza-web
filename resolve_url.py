import urllib.request
url = "https://share.google/nEqIZkVHYV0SUUj1M"
req = urllib.request.Request(url, method="HEAD")
try:
    response = urllib.request.urlopen(req)
    print(response.geturl())
except Exception as e:
    print(e)
