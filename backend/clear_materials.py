# clear_materials.py
from database import SessionLocal
import models


def main():
    db = SessionLocal()
    try:
        deleted = db.query(models.CourseMaterial).delete()
        db.commit()
        print(f"Удалено материалов: {deleted}")
    finally:
        db.close()


if __name__ == "__main__":
    main()
