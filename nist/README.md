# Testing mnemonics generation for a test NIST SP 800-22

To verify the security of mnemonic generation, we will test the [noble-hashes](https://github.com/paulmillr/noble-hashes) library, which generates entropy.
The verification test was sourced from the official NIST website at [csrc.nist.gov](https://csrc.nist.gov/projects/random-bit-generation/documentation-and-software).

How to build
------------
Download this repository. On command line, type in the following commands:
```console
$ cd nist/sts-2.1.2
$ mkdir -p obj
$ make -f makefile
```

Testing
------------
Return to the directory above in `nist` and run the script `run-test.sh`.
```console
$ cd ..
$ sh run-test.sh
```

The file will start generating 1,500,000 bytes of random data and save it in the `output` file.
Further testing itself will start.

Choose the test method ([0] Input File):
```console
$ Enter Choice: 0
```

Enter the path to the file:
```console
$ User Prescribed Input File: ../output
```

Choose the type of test ([01] Frequency):
```console
$ Enter Choice: 1
```

Enter the test parameters:
```console
$ Select Test (0 to continue): 0
$ How many bitstreams? 10
```

Choose a file type. In our case, this is Binary ([1] Binary - Each byte in data file contains 8 bits of data):
```console
$ ...
  Select input mode: 1
```

The test will conclude when the message 'Statistical Testing Complete!!!!!!!!!!!!' appears in the terminal.
After that, the 'finalAnalysisReport.txt' containing the test results will be opened.
The results are written to the file `/core-ts/nist/sts-2.1.2/experiments/AlgorithmTesting/finalAnalysisReport.txt`
