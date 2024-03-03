import re


def extract_price(junk: str | None) -> str:
    if junk:
        return re.sub(r',.*|\D', '', junk).strip()
    return None

def remove_unicode_00a0(text: str) -> str:
    return re.sub(r'\u00a0', '', text)

def clear_junk(junk: str) -> str:
    return junk.strip().replace('\n', '').replace('Brend: ', '')
