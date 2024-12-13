// benchmark.cpp
#include <emscripten/bind.h>

using namespace emscripten;

// Using integer math where WASM typically excels
double calculate(int iterations) {
    unsigned long long result = 0;
    const int innerLoop = 100;

    // Using integer operations instead of floating point
    for (int i = 0; i < iterations; i++) {
        unsigned int localSum = 0;
        for (int j = 0; j < innerLoop; j++) {
            // Bitwise and integer operations
            localSum += ((j << 2) + (j >> 1)) ^ i;
        }
        result += localSum;
    }

    return static_cast<double>(result);
}

EMSCRIPTEN_BINDINGS(module) {
    function("calculate", &calculate);
}
