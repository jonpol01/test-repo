"""
Pytest test suite for calculator operations.

This module contains comprehensive tests for the calculator module, covering:
- Basic arithmetic operations (add, subtract, multiply, divide)
- Positive and negative number combinations
- Edge cases including zero values
- Error handling for invalid operations
"""

import pytest
from calculator import add, subtract, multiply, divide


# =============================================================================
# ADDITION TESTS
# =============================================================================

class TestAddition:
    """Tests for the add function."""

    def test_add_positive_numbers(self):
        """Test adding two positive numbers."""
        assert add(2, 3) == 5

    def test_add_negative_numbers(self):
        """Test adding two negative numbers."""
        assert add(-2, -3) == -5

    def test_add_mixed_signs_positive_result(self):
        """Test adding positive and negative with positive result."""
        assert add(5, -3) == 2

    def test_add_mixed_signs_negative_result(self):
        """Test adding positive and negative with negative result."""
        assert add(-5, 3) == -2

    def test_add_with_zero_first(self):
        """Test adding zero as first operand."""
        assert add(0, 5) == 5

    def test_add_with_zero_second(self):
        """Test adding zero as second operand."""
        assert add(5, 0) == 5

    def test_add_both_zeros(self):
        """Test adding two zeros."""
        assert add(0, 0) == 0

    def test_add_floats(self):
        """Test adding floating point numbers."""
        assert add(1.5, 2.5) == 4.0

    def test_add_large_numbers(self):
        """Test adding large numbers."""
        assert add(1000000, 2000000) == 3000000

    def test_add_identity_property(self):
        """Test that adding zero returns the original number."""
        assert add(42, 0) == 42


# =============================================================================
# SUBTRACTION TESTS
# =============================================================================

class TestSubtraction:
    """Tests for the subtract function."""

    def test_subtract_positive_numbers(self):
        """Test subtracting two positive numbers."""
        assert subtract(5, 3) == 2

    def test_subtract_negative_numbers(self):
        """Test subtracting two negative numbers."""
        assert subtract(-5, -3) == -2

    def test_subtract_mixed_signs_positive_result(self):
        """Test subtracting with positive result."""
        assert subtract(5, -3) == 8

    def test_subtract_mixed_signs_negative_result(self):
        """Test subtracting with negative result."""
        assert subtract(-5, 3) == -8

    def test_subtract_with_zero_first(self):
        """Test subtracting from zero."""
        assert subtract(0, 5) == -5

    def test_subtract_with_zero_second(self):
        """Test subtracting zero."""
        assert subtract(5, 0) == 5

    def test_subtract_both_zeros(self):
        """Test subtracting two zeros."""
        assert subtract(0, 0) == 0

    def test_subtract_floats(self):
        """Test subtracting floating point numbers."""
        assert subtract(5.5, 2.5) == 3.0

    def test_subtract_equal_numbers(self):
        """Test subtracting equal numbers returns zero."""
        assert subtract(10, 10) == 0


# =============================================================================
# MULTIPLICATION TESTS
# =============================================================================

class TestMultiplication:
    """Tests for the multiply function."""

    def test_multiply_positive_numbers(self):
        """Test multiplying two positive numbers."""
        assert multiply(3, 4) == 12

    def test_multiply_negative_numbers(self):
        """Test multiplying two negative numbers."""
        assert multiply(-3, -4) == 12

    def test_multiply_mixed_signs_first_negative(self):
        """Test multiplying with first number negative."""
        assert multiply(-3, 4) == -12

    def test_multiply_mixed_signs_second_negative(self):
        """Test multiplying with second number negative."""
        assert multiply(3, -4) == -12

    def test_multiply_with_zero_first(self):
        """Test multiplying zero as first operand."""
        assert multiply(0, 5) == 0

    def test_multiply_with_zero_second(self):
        """Test multiplying zero as second operand."""
        assert multiply(5, 0) == 0

    def test_multiply_both_zeros(self):
        """Test multiplying two zeros."""
        assert multiply(0, 0) == 0

    def test_multiply_by_one(self):
        """Test multiplying by one returns original number."""
        assert multiply(42, 1) == 42

    def test_multiply_by_negative_one(self):
        """Test multiplying by negative one negates the number."""
        assert multiply(42, -1) == -42

    def test_multiply_floats(self):
        """Test multiplying floating point numbers."""
        assert multiply(2.5, 4.0) == 10.0

    def test_multiply_large_numbers(self):
        """Test multiplying large numbers."""
        assert multiply(1000, 2000) == 2000000


# =============================================================================
# DIVISION TESTS
# =============================================================================

class TestDivision:
    """Tests for the divide function."""

    def test_divide_positive_numbers(self):
        """Test dividing two positive numbers."""
        assert divide(10, 2) == 5

    def test_divide_negative_numbers(self):
        """Test dividing two negative numbers."""
        assert divide(-10, -2) == 5

    def test_divide_mixed_signs_first_negative(self):
        """Test dividing with first number negative."""
        assert divide(-10, 2) == -5

    def test_divide_mixed_signs_second_negative(self):
        """Test dividing with second number negative."""
        assert divide(10, -2) == -5

    def test_divide_with_zero_numerator(self):
        """Test dividing zero by a number."""
        assert divide(0, 5) == 0

    def test_divide_by_one(self):
        """Test dividing by one returns original number."""
        assert divide(42, 1) == 42

    def test_divide_by_negative_one(self):
        """Test dividing by negative one negates the number."""
        assert divide(42, -1) == -42

    def test_divide_floats(self):
        """Test dividing floating point numbers."""
        assert divide(10.5, 2.0) == 5.25

    def test_divide_uneven_result(self):
        """Test division that results in a float."""
        assert divide(7, 2) == 3.5

    def test_divide_by_zero_raises_error(self):
        """Test that dividing by zero raises ZeroDivisionError."""
        with pytest.raises(ZeroDivisionError):
            divide(10, 0)

    def test_divide_by_zero_negative(self):
        """Test that dividing by negative zero raises ZeroDivisionError."""
        with pytest.raises(ZeroDivisionError):
            divide(-10, 0)

    def test_divide_zero_by_zero_raises_error(self):
        """Test that dividing zero by zero raises ZeroDivisionError."""
        with pytest.raises(ZeroDivisionError):
            divide(0, 0)


# =============================================================================
# EDGE CASE AND ERROR HANDLING TESTS
# =============================================================================

class TestEdgeCases:
    """Tests for edge cases and boundary conditions."""

    def test_add_very_large_numbers(self):
        """Test adding very large numbers."""
        assert add(10**15, 10**15) == 2 * (10**15)

    def test_multiply_very_large_numbers(self):
        """Test multiplying very large numbers."""
        assert multiply(10**7, 10**7) == 10**14

    def test_divide_very_small_by_large(self):
        """Test dividing very small number by large number."""
        result = divide(1, 10**6)
        assert abs(result - 0.000001) < 1e-12

    def test_operations_with_one(self):
        """Test operations involving the number one."""
        assert add(1, 1) == 2
        assert subtract(1, 1) == 0
        assert multiply(5, 1) == 5
        assert divide(5, 1) == 5

    def test_operations_with_negative_one(self):
        """Test operations involving negative one."""
        assert add(-1, -1) == -2
        assert subtract(-1, -1) == 0
        assert multiply(5, -1) == -5
        assert divide(-5, -1) == 5


# =============================================================================
# PARAMETRIZED TESTS FOR COMPREHENSIVE COVERAGE
# =============================================================================

@pytest.mark.parametrize("a,b,expected", [
    (1, 2, 3),
    (-1, -2, -3),
    (0, 0, 0),
    (100, -50, 50),
    (-100, 50, -50),
])
def test_add_parametrized(a, b, expected):
    """Parametrized tests for addition."""
    assert add(a, b) == expected


@pytest.mark.parametrize("a,b,expected", [
    (5, 3, 2),
    (-5, -3, -2),
    (0, 0, 0),
    (100, -50, 150),
    (-100, 50, -150),
])
def test_subtract_parametrized(a, b, expected):
    """Parametrized tests for subtraction."""
    assert subtract(a, b) == expected


@pytest.mark.parametrize("a,b,expected", [
    (2, 3, 6),
    (-2, -3, 6),
    (0, 5, 0),
    (-2, 3, -6),
    (2, -3, -6),
])
def test_multiply_parametrized(a, b, expected):
    """Parametrized tests for multiplication."""
    assert multiply(a, b) == expected


@pytest.mark.parametrize("a,b,expected", [
    (10, 2, 5),
    (-10, -2, 5),
    (0, 5, 0),
    (-10, 2, -5),
    (10, -2, -5),
])
def test_divide_parametrized(a, b, expected):
    """Parametrized tests for division."""
    assert divide(a, b) == expected


@pytest.mark.parametrize("a,b", [
    (10, 0),
    (-10, 0),
    (0, 0),
])
def test_divide_by_zero_raises(a, b):
    """Parametrized tests for division by zero error."""
    with pytest.raises(ZeroDivisionError):
        divide(a, b)


# =============================================================================
# INTEGRATION TESTS
# =============================================================================

def test_chained_operations():
    """Test chaining multiple operations together."""
    result = add(subtract(multiply(2, 3), divide(10, 2)), multiply(-1, -5))
    assert result == 9


def test_order_of_operations_simulation():
    """Simulate order of operations: (2 + 3) * 4 - 5 / 1."""
    part1 = multiply(add(2, 3), 4)
    part2 = divide(5, 1)
    result = subtract(part1, part2)
    assert result == 15


def test_inverse_operations():
    """Test that inverse operations cancel out."""
    # Add then subtract should return to original
    result = subtract(add(10, 5), 5)
    assert result == 10

    # Multiply then divide should return to original
    result = divide(multiply(10, 5), 5)
    assert result == 10


if __name__ == "__main__":
    pytest.main([__file__, "-v"])