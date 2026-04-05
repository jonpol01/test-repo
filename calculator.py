"""Calculator module providing basic arithmetic operations."""


def add(a: float, b: float) -> float:
    """Add two numbers together.

    Args:
        a: First number.
        b: Second number.

    Returns:
        The sum of a and b.
    """
    return a + b


def subtract(a: float, b: float) -> float:
    """Subtract the second number from the first.

    Args:
        a: First number (minuend).
        b: Second number (subtrahend).

    Returns:
        The difference of a and b.
    """
    return a - b


def multiply(a: float, b: float) -> float:
    """Multiply two numbers together.

    Args:
        a: First number (multiplicand).
        b: Second number (multiplier).

    Returns:
        The product of a and b.
    """
    return a * b


def divide(a: float, b: float) -> float:
    """Divide the first number by the second.

    Args:
        a: Dividend (numerator).
        b: Divisor (denominator).

    Returns:
        The quotient of a divided by b.

    Raises:
        ZeroDivisionError: If b is zero.
    """
    if b == 0:
        raise ZeroDivisionError("Cannot divide by zero")
    return a / b