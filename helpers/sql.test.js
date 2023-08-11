describe('sqlForPartialUpdate', function () {
    test('works: normal case', function () {
      const dataToUpdate = { firstName: 'Aliya', age: 32 };
      const jsToSql = { firstName: 'first_name', age: 'age' };
      const result = sqlForPartialUpdate(dataToUpdate, jsToSql);
  
      expect(result).toEqual({
        setCols: '"first_name"=$1, "age"=$2',
        values: ['Aliya', 32],
      });
    });
  
    test('throws BadRequestError if no data provided', function () {
      expect(() => {
        sqlForPartialUpdate({}, {});
      }).toThrowError(BadRequestError);
    });
  
  });
  