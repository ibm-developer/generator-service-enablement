# Object Storage
 
Object Storage provides you a fully provisioned account, based on the Swift API, to manage your data. With Object Storage, your unstructured data is stored in a scalable, multi-tenant cloud environment. The service uses OpenStack Identity (Keystone) for authentication and can be accessed directly by using OpenStack Object Storage (Swift) API v1 calls. 

##  Credentials

###  LocalDevConfig

This is where your local configuration is stored for Cloudant.
```
{
  "objectStorage_projectId": "XXXX", // Object Storage ProjectId
  "objectStorage_project": "object_storage_XXXXX", // Object Storage Project
  "objectStorage_userId": "XXXX", //Object Storage UserId
  "objectStorage_password": "XXX", //Object Storage password
  "objectStorage_region": "dallas", //Object Storage region
  "objectStorage_authurl" : "https://object_storage.com/", //Object Storage Authorization Url
  "objectStorage_domainName" : "XXXX" //Object Storage Domain Name
}
```

## Usages

```python
    messages = []
    os = service_manager.get('object-storage')
    messages.append('test container was created')
    try:
        os.get_container('test')
        os.put_object(container='test', obj='ninpocho', contents='test', content_type='text/plain')
        messages.append('ninpocho object was added')
    except Exception as e:
        abort(500, 'Exception thrown ' + e)
    return jsonify(messages)
```

**Note**: Authorization URL will be using `api version 3` and will appended `/v3` at runtime when using service

## Documentation

Other related docuemtation can be found [here](https://docs.openstack.org/python-swiftclient/latest/)