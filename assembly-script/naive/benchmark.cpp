// benchmark.cpp
#include <emscripten/bind.h>
#include <cmath>
#include <vector>

using namespace emscripten;

// Intensive computation fully in C++
double calculate(int iterations) {
    double result = 0.0;
    int loopIterations = 1000; // Inner loop iterations

    for (int i = 0; i < iterations; i++) {
        // Inner computation loop
        for (int j = 0; j < loopIterations; j++) {
            result += std::sqrt((j * j) + (j / 2.0)) + std::sin(j) * std::cos(i);
        }
    }
    return result;
}

// JavaScript equivalent will be implemented in the HTML

EMSCRIPTEN_BINDINGS(module) {
    function("calculate", &calculate);
}
