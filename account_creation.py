import requests
from eospy.cleos import Cleos

def createTestAccounts():
    ce = Cleos(url='http://127.0.0.1:8888')

    # use a string or EOSKey for push_transaction
    key = "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3"
    # use EOSKey:
    # import eospy.keys
    # key = eospy.keys.EOSKey('5HuaTWKeGzZhqyzuzFAjjFjPnnnjdgcp562oBSS8Wv1qgDSkR2W')

    resp = ce.create_account('eosio', key, 'testtesttest', 'EOS5YMv2UBcuiExv1C8fZjjnE4evofRdBh5Nrt8TYz44G7KC5tZNq', 'EOS5YMv2UBcuiExv1C8fZjjnE4evofRdBh5Nrt8TYz44G7KC5tZNq', permission='active', transfer=False, broadcast=True)

    print('------------------------------------------------')
    print(resp)
    print('------------------------------------------------')

createTestAccounts()
